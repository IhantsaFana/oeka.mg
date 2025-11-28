import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/shared/components/navigation/ScrollToTop';

export function AdminLayout() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <ScrollToTop />
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
}
