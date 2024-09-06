import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton is from shadcn-ui
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"


const YapCardSkeleton = () => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start space-y-0 pb-3">
        <Skeleton className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>

      <CardFooter className="flex justify-between py-2 px-4 border-t">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-12 h-6" />
      </CardFooter>
    </Card>
  );
};

export default YapCardSkeleton;
