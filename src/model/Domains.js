export default class Domain {
    constructor(data) {
        this.domainId = data.domainId;
        this.program = data.program;
        this.batch = data.batch;
        this.capacity = data.capacity;
        this.qualification = data.qualification;
    }

    getDomainId() {
        return this.domainId;
    }

    getProgram() {
        return this.program;
    }

    getBatch() {
        return this.batch;
    }

    getCapacity() {
        return this.capacity;
    }

    getQualification() {
        return this.qualification;
    }
}
