export default class Placement {
    constructor(data) {
        this.id = data.id;
        this.organization = data.organization;
        this.profile = data.profile;
        this.description = data.description;
        this.intake = data.intake;
        this.minimumGrade = data.minimumGrade;
    }

    // Getter methods
    getId() {
        return this.id;
    }

    getOrganization() {
        return this.organization;
    }

    getProfile() {
        return this.profile;
    }

    getDescription() {
        return this.description;
    }

    getIntake() {
        return this.intake;
    }

    getMinimumGrade() {
        return this.minimumGrade;
    }
}
