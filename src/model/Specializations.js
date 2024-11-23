export default class Specialization {
    constructor(data) {
        this.specializationId = data.specializationId;
        this.code = data.code;
        this.name = data.name;
        this.description = data.description;
        this.years = data.years;
        this.creditsRequired = data.creditsRequired;
    }

    // Getter methods
    getSpecializationId() {
        return this.specializationId;
    }

    getCode() {
        return this.code;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getYears() {
        return this.years;
    }

    getCreditsRequired() {
        return this.creditsRequired;
    }
}
