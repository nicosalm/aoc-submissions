"use client";

import ButtonGroup from "@/components/ButtonGroup";
import CodeViewer from "@/components/CodeViewer";
import UserList from "@/components/UserList";
import { PartType, User } from "@/util/users";
import { USERS } from "@/util/users";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params or defaults
  const [selectedUser, setSelectedUser] = useState<User>(() => {
    const username = searchParams.get("user");
    return USERS.find((u) => u.username === username) ?? USERS[0];
  });

  const [selectedPart, setSelectedPart] = useState<PartType>(() => {
    const part = searchParams.get("part");
    return part === "B" ? "B" : "A";
  });

  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const day = searchParams.get("day");
    return day ? parseInt(day, 10) || 1 : 1;
  });

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("user", selectedUser.username);
    params.set("part", selectedPart);
    params.set("day", selectedDay.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedUser, selectedPart, selectedDay, router]);

  // Fetch source code directly from GitHub
  const fetchSourceCode = useCallback(async (
    username: string,
    day: number,
    part: PartType
  ): Promise<string> => {
    const user = USERS.find((u) => u.username === username);
    if (!user) {
      return `// User ${username} not found`;
    }

    try {
      const path = user.mapToPath(day, part);
      const url = `https://raw.githubusercontent.com/${username}/${user.repo}/main/${path}`;

      const response = await fetch(url);

      if (!response.ok) {
        return `// Error fetching file: ${response.statusText}\n// URL: ${url}`;
      }

      return await response.text();
    } catch (error) {
      return `// Error: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }, []);

  return (
    <div className="h-screen bg-bg p-4 pb-8 overflow-hidden">
      <div className="grid grid-cols-[300px_1fr] gap-4 h-full">
        {/* Left: User List */}
        <div className="bg-card p-4 border border-border">
          <h2 className="text-lg font-semibold mb-4">Users</h2>
          <UserList
            users={USERS}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </div>

        {/* Right: Controls and Code Viewer */}
        <div className="flex flex-col gap-4 h-full min-h-0">
          <div className="bg-card p-4 border border-border shrink-0">
            <ButtonGroup
              selectedPart={selectedPart}
              selectedDay={selectedDay}
              onSelectPart={setSelectedPart}
              onSelectDay={setSelectedDay}
            />
          </div>
          <div className="bg-card flex-1 overflow-hidden">
            <CodeViewer
              username={selectedUser.username}
              part={selectedPart}
              day={selectedDay}
              language={selectedUser.language}
              fetchSourceCode={fetchSourceCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
