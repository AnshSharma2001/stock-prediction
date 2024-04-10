import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const AccountSection = () => {
  return (
    <div className="grid gap-6">
      <h1 className="text-lg font-bold text-foreground">Account</h1>
      {/* WARNING: DO NOT USE THIS WAY TO INITIALIZE THE FORMS THIS WAY USE ZOD INSTEAD.
          YOU CAN GOOGLE ABOUT ZOD, IF YOU STILL CANNOT FIGURE IT OUT LET ME KNOW ~ ANSH   
      */}
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Name</CardTitle>
          <CardDescription>Please enter your name to change it</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Name" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Plugins Directory</CardTitle>
          <CardDescription>
            The directory within your project, in which your plugins are
            located.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input placeholder="Project Name" defaultValue="/content/plugins" />
            <div className="flex items-center space-x-2">
              <Checkbox id="include" defaultChecked />
              <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow administrators to change the directory.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
