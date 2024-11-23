export default class Students {
    constructor(data) {
        this.studentId = data.studentId;
        this.rollNumber = data.rollNumber;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.photographPath = data.photographPath;
        this.cgpa = data.cgpa;
        this.totalCredits = data.totalCredits;
        this.graduationYear = data.graduationYear;
        this.domainId = data.domainId;
        this.specializationId = data.specializationId;
        this.placementId = data.placementId;
    }

    getStudentId() {
        return this.studentId;
    }

    getRollNumber() {
        return this.rollNumber;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }

    getPhotographPath() {
        return this.photographPath;
    }

    getCgpa() {
        return this.cgpa;
    }

    getTotalCredits() {
        return this.totalCredits;
    }

    getGraduationYear() {
        return this.graduationYear;
    }

    getDomainId() {
        return this.domainId;
    }

    getSpecializationId() {
        return this.specializationId;
    }

    getPlacementId() {
        return this.placementId;
    }
}
