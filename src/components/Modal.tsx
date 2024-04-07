import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Button } from "@/components/ui/button";
  import { PlusIcon } from "@radix-ui/react-icons";

  interface Props {
    isOpen: boolean;
    onClose: () => void; // Add a prop for closing the modal
  }
  
  const AddMLModal = ({ isOpen, onClose }: Props) => {
    if (!isOpen) return null;
  
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload your Model</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Form fields */}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClose}>Submit Model</Button>
        </DialogFooter>
      </DialogContent>
    );
  };
  
  export default AddMLModal;