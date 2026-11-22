Adds a small badge to each workspace row in the sidebar showing how many agents are open in that workspace, so you can see at a glance where work is still running.

An agent counts as open until the daemon reports it closed, meaning its CLI process has stopped. Background helpers that Paseo hides from tabs, such as title generators, are not counted. The badge is hidden when a workspace has no open agents.

The plugin is client-only. It reads agent state already available in the app and sends nothing anywhere. It requires a Paseo app that supports workspace row badges; older apps load the plugin but show nothing.
