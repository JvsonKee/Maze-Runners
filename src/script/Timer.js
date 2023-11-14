class Timer {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
    }

    start() {
        if (this.isRunning) {
            return console.error("Timer is already running");
        }
        this.isRunning = true;
        this.startTime = Date.now();
    }

    stop() {
        if (!this.isRunning) {
            return console.error("Timer is already stopped");
        }
        this.isRunning = false;
        this.overallTime = this.overallTime + this.getTimeSinceLastStart();
    }

    reset() {
        this.overallTime = 0;

        if (this.isRunning) {
          this.startTime = Date.now();
          return;
        }
    
        this.startTime = 0;
    }

    getTime () {
        if (!this.startTime) {
          return 0;
        }
    
        if (this.isRunning) {
          return this.overallTime + this.getTimeSinceLastStart();
        }
    
        return this.overallTime;
      }

	  getTimeSinceLastStart () {
        if (!this.startTime) {
          return 0;
        }
      
        return Date.now() - this.startTime;
    }
}