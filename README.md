# MMM-CityBusETA

**MMM-CityBusETA** is a MagicMirror² module that displays the estimated time of arrival (ETA) for CityBus in Hong Kong. The module fetches real-time data and updates the screen at regular intervals.

## Installation

1. Navigate to the `modules` folder of your MagicMirror installation:
    ```bash
    cd ~/MagicMirror/modules
    ```

2. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/MMM-CityBusETA.git
    ```

3. Navigate to the `MMM-CityBusETA` folder:
    ```bash
    cd MMM-CityBusETA
    ```

4. Install dependencies (if any):
    ```bash
    npm install
    ```

## Configuration

To use this module, add it to the `config.js` file of your MagicMirror setup. Below is an example configuration:

```javascript
{
    module: "MMM-CityBusETA",
    position: "middle_center",  // Choose your preferred position
    config: {
        updateInterval: 10000  // Update interval in milliseconds (default is 10000)
    }
}
