import { useEffect, useState } from "react";


const useSession = (...dependency: unknown[]) => {
    const [session, setSession] = useState<string>('');

    useEffect(() => {
        const session = localStorage.getItem("session");
        if (session) {
            setSession(session);
        }
      }, [dependency]);
    
    
    return { session };
}

export default useSession;
