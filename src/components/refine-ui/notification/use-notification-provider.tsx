import type { NotificationProvider } from "@refinedev/core";
import { toast } from "sonner";
import { UndoableNotification } from "@/components/refine-ui/notification/undoable-notification";
import { NotificationCopyButton } from "@/components/refine-ui/notification/copy-button";

function translateSuccessMessage(message: string) {
  if (message.startsWith("Successfully created")) return "Se guardó correctamente";
  if (message.startsWith("Successfully updated")) return "Se guardó correctamente";
  if (message.startsWith("Successfully deleted")) return "Se eliminó correctamente";
  return message;
}

export function useNotificationProvider(): NotificationProvider {
  return {
    open: ({
      key,
      type,
      message,
      description,
      undoableTimeout,
      cancelMutation,
    }) => {
      switch (type) {
        case "success":
          toast.success(translateSuccessMessage(message), {
            id: key,
            description,
            richColors: true,
          });
          return;

        case "error": {
          toast.error(message, {
            id: key,
            description: description,
            action: (
              <NotificationCopyButton
                text={`{"message": "${message}", "description": "${description}"}`}
                className="ml-auto"
              />
            ),
            richColors: true,
            duration: 10000,
          });
          return;
        }

        case "progress": {
          const toastId = key || Date.now();

          toast(
            () => (
              <UndoableNotification
                message={message}
                description={description}
                undoableTimeout={undoableTimeout}
                cancelMutation={cancelMutation}
                onClose={() => toast.dismiss(toastId)}
              />
            ),
            {
              id: toastId,
              duration: (undoableTimeout || 5) * 1000,
              unstyled: true,
            },
          );
          return;
        }

        default:
          return;
      }
    },
    close: (id) => {
      toast.dismiss(id);
    },
  };
}
