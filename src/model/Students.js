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
        this.domain = data.domain;
        this.specialization = data.specialization;
        this.placement = data.placement;
    }

    // Getter methods
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

    getDomain() {
        return this.domain;
    }

    getSpecialization() {
        return this.specialization;
    }

    getPlacement() {
        return this.placement;
    }

    // Setter methods
    setStudentId(studentId) {
        this.studentId = studentId;
    }

    setRollNumber(rollNumber) {
        this.rollNumber = rollNumber;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    setEmail(email) {
        this.email = email;
    }

    setPhotographPath(photographPath) {
        this.photographPath = photographPath;
    }

    setCgpa(cgpa) {
        this.cgpa = cgpa;
    }

    setTotalCredits(totalCredits) {
        this.totalCredits = totalCredits;
    }

    setGraduationYear(graduationYear) {
        this.graduationYear = graduationYear;
    }

    setDomain(domain) {
        this.domain = domain;
    }

    setSpecialization(specialization) {
        this.specialization = specialization;
    }

    setPlacement(placement) {
        this.placement = placement;
    }
}
