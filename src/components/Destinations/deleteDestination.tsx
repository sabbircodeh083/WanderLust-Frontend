"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Destination } from "@/lib/destinations";
import { Trash2Icon } from "lucide-react";
import { getClientJwtToken } from "@/lib/Token/getClientToken";

export function DeleteDestinationDialog({
  currentDestination,
}: {
  currentDestination: Destination | null;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    const token = await getClientJwtToken();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/destinations/${currentDestination?._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        router.push("/destinations");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-destructive/30 bg-transparent px-3 text-xs text-destructive shadow-none hover:bg-destructive/5 hover:text-destructive"
          >
            <Trash2Icon className="size-3.5" />
            Delete
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {currentDestination?.destinationName}
            </span>
            ? This action cannot be undone and will permanently remove this
            travel package from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={"bg-red-500"} onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
