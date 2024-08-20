export const capitalizeName = (name) => {
    let newName = name.charAt(0).toUpperCase() + name.slice(1);
    newName = newName.replace(/_/g, " ");
    return newName;
    }