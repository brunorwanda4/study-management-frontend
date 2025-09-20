const expiresOneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const expiresOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
const expiresThreeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

export { expiresOneDay, expiresOneWeek, expiresThreeDays };
