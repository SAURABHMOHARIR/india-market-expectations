import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="p-4 bg-muted/10 rounded-full">
                <AlertCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
            <p className="text-muted-foreground text-center max-w-sm">
                The page you are looking for does not exist or has been removed.
            </p>
            <Link
                href="/"
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
