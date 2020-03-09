/**
 * Name: Mark Danez Ricalde
 * UCID: 10171889
 * Tutorial section: B02
 */

/**
 * Handles command from server
 */
export function commandHandler(cmd, user, onlineUsers) {
    const split = cmd.split(" ");
    const command = split[0];
    const arg = split[1];

    handleCommandErrors(cmd, onlineUsers);

    const userIndex = onlineUsers.indexOf(user);

    if (command === '/nick') {
        user.name = arg;
        onlineUsers[userIndex].name = arg;
    }

    if (command === '/nickcolor') {
        user.color = arg;
        onlineUsers[userIndex].color = arg;
    }
}

/**
 * handles possible errors
 */
export function handleCommandErrors(cmd, onlineUsers) {
    const cmdSplit = cmd.split(" ");

    // Check number of arguments
    if (cmdSplit.length !== 2) {
        throw `Invalid number of arguments. Use only one argument.`;
    }

    const command = cmdSplit[0];
    const arg = cmdSplit[1];

    // Check if new nickname is unique
    if (command === '/nick' && !isUsernameUnique(arg, onlineUsers)) {
        throw `Nickname (${arg}) is already taken by another user. Select another username.`;
    }

    // Check if valid color
    if (command === '/nickcolor' && !(/[0-9A-F]{6}$/i.test(arg))) {
        throw `Invalid nickname color`;
    }
}

/**
 * Checks if username is unique
 */
export function isUsernameUnique(username, onlineUsers) {
    const usernames = onlineUsers.map((user) => user.name);
    return !usernames.includes(username)
}
