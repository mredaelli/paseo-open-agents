import { useAgents } from "@getpaseo/plugin/client";
import type { PluginClientContext, PluginWorkspaceRowBadgeItemProps } from "@getpaseo/plugin/client";
import { WorkspaceRowBadge } from "@getpaseo/plugin/client/ui";

// An agent counts as open until the daemon reports it closed (its CLI process stopped).
// Background helpers (title generators and the like) are hidden from tabs, so they are skipped here too.
function OpenAgents({ workspaceId }: PluginWorkspaceRowBadgeItemProps) {
  const open = useAgents({
    where: (agent) => agent.workspaceId === workspaceId && !agent.background && agent.status !== "closed",
  });
  if (open.length === 0) return null;
  const label = open.length === 1 ? "1 open agent" : `${open.length} open agents`;
  return <WorkspaceRowBadge icon="Bot" label={String(open.length)} tone="info" accessibilityLabel={label} />;
}

export default function contribute(client: PluginClientContext) {
  // Apps older than this API have no addWorkspaceRowBadgeItem.
  if (!client.addWorkspaceRowBadgeItem) return () => {};
  return client.addWorkspaceRowBadgeItem({ id: "open-agents", title: "Open agents", icon: "Bot", Component: OpenAgents });
}
