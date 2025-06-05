import { Group } from "@/types/group";

const API_BASE_URL = "http://13.125.23.179:9999/api/v1/groups";

// 모임 목록 조회
export async function fetchGroups(): Promise<Group[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch groups");
  return res.json();
}

// 모임 상세 조회
export async function fetchGroupDetail(groupId: string): Promise<Group> {
  const res = await fetch(`${API_BASE_URL}/${groupId}`);
  if (!res.ok) throw new Error("Failed to fetch group detail");
  return res.json();
}

// 모임 정보 수정
export async function updateGroup(groupId: string, data: Partial<Group>): Promise<Group> {
  const res = await fetch(`${API_BASE_URL}/${groupId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update group");
  return res.json();
}

// 모임 삭제
export async function deleteGroup(groupId: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${API_BASE_URL}/${groupId}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete group");
  return res.json();
}
