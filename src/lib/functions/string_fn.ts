export const formatGender= (gender : string) : string => {
    switch (gender) {
        case "M":
            return "Male"
        case "F":
            return "Female"    
        case "O":
            return "Other"
        default:
            return "Unknown";
    }
}