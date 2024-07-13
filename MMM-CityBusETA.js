Module.register("MMM-CityBusETA", {
    defaults: {
        updateInterval: 10000  // 10 seconds
    },

    start: function() {
        this.etaData = [];  // Initialize etaData as an empty array
        this.getETA();  // Call the function to get ETA data at start
        this.scheduleUpdate();  // Schedule continuous updates
    },

    getStyles: function() {
        return ["MMM-CityBusETA.css"];
    },

    getETA: function() {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://rt.data.gov.hk/v2/transport/citybus/eta/ctb/002759/26", true);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                if (response && response.data && response.data.length > 0) {
                    self.etaData = response.data.map(data => data.eta);
                    self.updateDom();
                }
            } else if (this.readyState == 4) {
                console.log("Error fetching data: " + this.status);
            }
        };
        xhr.send();
    },

    scheduleUpdate: function() {
        var self = this;
        setInterval(function() {
            self.getETA();
        }, this.config.updateInterval);
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        if (this.etaData.length > 0) {
            var now = new Date();

            var etaTexts = this.etaData.map((eta, index) => {
                var etaDate = new Date(eta);
                var diff = etaDate - now;
                var minutes = Math.floor(diff / 60000);
                var seconds = Math.floor((diff % 60000) / 1000);
                var className = minutes < 3 ? "critical" : "normal";
                
                var minutesDisplay = `<span class='minutes-large'>${minutes}m</span>`;
                var secondsDisplay = `<span class='seconds-small'> ${seconds}s</span>`;
                var timeDisplay = minutes > 4 ? minutesDisplay : `${minutesDisplay}${secondsDisplay}`;

                if (diff <= 0) {
                    return `<div class='normal'>${index === 0 ? "Bus 26 has arrived!" : "Next Bus 26 has arrived!"}</div>`;
                } else {
                    return `<div class='${className}'>${index === 0 ? "Bus 26 arrives in: " : "Next Bus 26 arrives in: "}${timeDisplay}</div>`;
                }
            });

            wrapper.innerHTML = etaTexts.join("<br>");
        } else {
            wrapper.innerHTML = "Loading...";
        }

        return wrapper;
    }
});
