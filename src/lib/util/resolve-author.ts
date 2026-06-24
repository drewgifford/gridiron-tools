import type { User as ClerkUser } from "@clerk/nextjs/server";
import { clerk } from "../client/clerk";
import type { User } from "../schema/author";

type WithUserId = {
  userId: string;
};
type WithUser = {
  user: User | null;
};

export async function attachAuthors<T extends WithUserId>(
  objs: T[],
): Promise<(T & WithUser)[]> {
  const userIds = new Set(objs.map((obj) => obj.userId));
  if (userIds.size === 0) return objs.map((obj) => ({ ...obj, user: null }));

  const { data } = await clerk.users.getUserList({
    userId: Array.from(userIds),
    limit: userIds.size,
  });

  const userMap = new Map(data.map((user) => [user.id, user]));

  return objs.map((obj) => {
    const user = userMap.get(obj.userId);
    return {
      ...obj,
      user: mapClerkUser(user),
    };
  });
}

function mapClerkUser(user?: ClerkUser): User | null {
  if (!user) return null;
  const name = user.username || user.fullName;
  if (!name) return null;
  return {
    name,
    id: user.id,
  };
}
