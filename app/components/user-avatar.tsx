"use client";

import { UserCircle2 } from "lucide-react";

const UserAvatar = () => {
  // const pathName = usePathname()

  return (
    <div className="flex items-center">
      <UserCircle2 className="mx-auto w-8 h-8" />
    </div>
  );
};

export default UserAvatar;
