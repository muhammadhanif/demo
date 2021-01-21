/*
# @author       : Muhammad Hanif
# @email        : moehammadhanif@gmail.com
# @telegram     : https://t.me/hanifmu
# @home page    : https://hanifmu.com
# @create date  : 2020-12-12 06:15:01
# @modify date  : 2020-12-12 06:15:01
*/

// thank to https://www.w3resource.com/javascript-exercises/javascript-date-exercise-8.php
function between_two_date(date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);

  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}

//  thanks to https://www.w3resource.com/javascript-exercises/javascript-date-exercise-14.php
function days_of_a_year(year) {
  return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

// counting percentage of many days until now
function percentage(num_1, num_2) {
  var res = (num_1 / num_2) * 100;

  return res.toFixed(2);
}

// get the day of today
var d1 = new Date();
var date_of_this_day = d1.toLocaleDateString("en-US");

// get the last day of this year
var d2 = new Date(parseInt(d1.getFullYear()), 11, 31);
var last_date_of_this_year = d2.toLocaleDateString("en-US");

// calculate remaining days of this year
var remaining_days_of_this_year = between_two_date(
  date_of_this_day,
  last_date_of_this_year
);

// total days of this year
var total_days_of_this_year = days_of_a_year(d1.getFullYear());

// how many days until now?
var many_days_until_now = total_days_of_this_year - remaining_days_of_this_year;

// percentage of many days until now
var count_prctg = percentage(many_days_until_now, total_days_of_this_year);

// progress_1
var progress_1 = document.getElementById("progress_1");

progress_1.innerText = count_prctg + " %";
progress_1.setAttribute("style", "width: " + count_prctg + "%");
progress_1.setAttribute("aria-valuenow", count_prctg);

document.getElementById("year").innerText =
  "PROGRESS BAR TAHUN " + d1.getFullYear();
document.getElementById("you_are_in").innerText =
  "ANDA SAAT INI BERADA DI HARI KE-" +
  many_days_until_now +
  " DARI " +
  total_days_of_this_year +
  " HARI DI TAHUN " +
  d1.getFullYear();

/** 
if (count_prctg >= 0 && count_prctg <= 33) {
  progress_1.setAttribute(
    "class",
    "progress-bar progress-bar-striped progress-bar-animated bg-success"
  );
} else if (count_prctg >= 34 && count_prctg <= 66) {
  progress_1.setAttribute(
    "class",
    "progress-bar progress-bar-striped progress-bar-animated bg-warning"
  );
} else {
  progress_1.setAttribute(
    "class",
    "progress-bar progress-bar-striped progress-bar-animated bg-danger"
  );
}
**/
