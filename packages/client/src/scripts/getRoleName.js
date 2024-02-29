/**
 * Gets the name of the highest relevent role for a user based on their flags
 * @param {String[]} flags An array of flags to check for
 * @returns Name of highest relevent role
 */
const getRoleName = (flags, roleType = "") => {
  if (roleType === "staff") {
    let roles = [];
    if (flags.includes("chief")) roles.push("FIR Chief");
    if (flags.includes("deputy")) roles.push("Deputy Chief");
    if (flags.includes("chief-instructor")) roles.push("Chief Instructor");
    if (flags.includes("web")) roles.push("Webmaster");
    if (flags.includes("events")) roles.push("Events Coordinator");
    if (flags.includes("sector")) roles.push("Sector Engineer");

    if (roles.length === 0) {
      return getRoleName(flags);
    } else {
      return roles.join(" & ");
    }
  } else if (roleType === "instructor") {
    if (flags.includes("chief-instructor")) return "Chief Instructor";
    if (flags.includes("instructor")) return "Instructor";
    if (flags.includes("mentor")) return "Mentor";
    return getRoleName(flags);
  } else {
    if (flags.includes("chief")) return "FIR Chief";
    if (flags.includes("deputy")) return "Deputy Chief";
    if (flags.includes("chief-instructor")) return "Chief Instructor";
    if (flags.includes("web")) return "Webmaster";
    if (flags.includes("events")) return "Events Coordinator";
    if (flags.includes("sector")) return "Sector Engineer";
    if (flags.includes("instructor")) return "Instructor";
    if (flags.includes("mentor")) return "Mentor";
    if (flags.includes("controller")) return "Home Controller";
    if (flags.includes("visitor")) return "Visiting Controller";
    return "Guest";
  }
};

export default getRoleName;
