import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const {accessToken, user, loading, refresh, fetchMe} = useAuthStore();
    const [starting, setStarting] = useState(true);
    const init = async ()=>{
        if(!accessToken){
            await refresh();
        }
        if(accessToken && !user){
            await fetchMe();
        }
        setStarting(false);
    }
    useEffect (()=>{
        init();
    }, []);
    if(loading || starting){
        return (
            <div className="min-h-screen bg-gradient-purple flex items-center justify-center">
                <div className="text-center">
                    {/* Loading Spinner */}
                    <div className="relative mb-8">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
                        <div className="w-12 h-12 border-4 border-purple-300/30 border-t-purple-300 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
                    </div>
                    
                    {/* Loading Text */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white animate-pulse">
                            Preparing your experience...
                        </h2>
                        <p className="text-white/80 text-sm animate-bounce">
                            Just a moment while we set things up ✨
                        </p>
                    </div>
                    
                    {/* Loading Dots */}
                    <div className="flex justify-center space-x-2 mt-6">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        )
    }
    if(!accessToken)
    {
        return (
            <Navigate to="/signin" replace />
        )
    }
  return (
      <Outlet />
  )
}

export default ProtectedRoute
