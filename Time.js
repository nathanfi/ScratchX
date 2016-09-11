(function(ext) {
   // Cleanup function when the extension is unloaded
   ext._shutdown = function() {};

   // Status reporting code
   // Use this to report missing hardware, plugin or unsupported browser
   ext._getStatus = function() {
      return {
         status: 2,
         msg: 'Ready'
      };
   };

   ext.time = function(timeMenu) {
      var today = new Date();
      if (timeMenu == 'Day of Week') {
         var day = today.getDay();
         if (day === 0 || day === 7) {
            return 'Sunday';
         } else if (day == 1) {
            return 'Monday';
         } else if (day == 2) {
            return 'Tuesday';
         } else if (day == 3) {
            return 'Wednesday';
         } else if (day == 4) {
            return 'Thursday';
         } else if (day == 5) {
            return 'Friday';
         } else if (day == 6) {
            return 'Saturday';
         }
      } else if (timeMenu == 'Minute') {
         return today.getMinutes();
      } else if (timeMenu == 'Second') {
         return today.getSeconds();
      } else if (timeMenu == 'Hour') {
         var hours = today.getHours();
         if (hours <= 12 && hours > 0) {
            return hours;
         } else if (hours === 0) {
            return 12;
         } else if (hours > 12) {
            return hours - 12;
         }
      } else if (timeMenu == 'Hour 24 Clock') {
         return today.getHours();
      } else if (timeMenu == 'Date') {
         return today.getDate();
      } else if (timeMenu == 'Month') {
         return today.getMonth();
      } else if (timeMenu == 'Year') {
         return today.getFullYear();
      }
   };

   ext.displayTime = function(displayMenu) {
      var today = new Date();
      var hours = today.getHours();
         if (hours === 0) {
            hours = 12;
         } else if (hours > 12) {
            hours = hours - 12;
          }
      var month = today.getMonth() + 1;
      if (displayMenu == 'Hours:Minutes') {
         return hours + ":" + today.getMinutes();
      } else if (displayMenu == 'Hours:Minutes:Seconds') {
         return hours + ":" + today.getMinutes() + ":" + today.getSeconds();
      } else if (displayMenu == 'Month/Date/Year') {
         return month + "/" + today.getDate() + "/" + today.getFullYear();
      } else if (displayMenu == 'Date/Month/Year') {
         return today.getDate() + "/" + month + "/" + today.getFullYear();
      } else if (displayMenu == 'Month/Date') {
         return month + "/" + today.getDate();
      } else if (displayMenu == 'Date/Month') {
         return today.getDate() + "/" + month;
      }
   };

   // Block and block menu descriptions
   var descriptor = {
      blocks: [
         ['r', 'Display %m.displayMenu', 'displayTime', 'Hours:Minutes'],
         ['r', 'Current %m.timeMenu', 'time', 'Day of Week']
      ],
      menus: {
         timeMenu: ['Day of Week', 'Hour', 'Hour 24 Clock', 'Minute', 'Second', 'Date', 'Month', 'Year'],
         displayMenu: ['Hours:Minutes', 'Hours:Minutes:Seconds', 'Month/Date', 'Date/Month', 'Month/Date/Year', 'Date/Month/Year']
      }
   };

   // Register the extension
   ScratchExtensions.register('Time', descriptor, ext);
})({});
