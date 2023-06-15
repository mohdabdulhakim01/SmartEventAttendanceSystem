# SmartEventAttendanceSystem
Old School Project to manage student attendance per event


---------------
Note
---------------
This project is my early project where I don't really know how to control relational table data really well to generate useful data together so build custom place to save the attendant data which is in the csv file. 
The System work well but for pulse check function which is not very stable since it use ajax request spam to compare latest live pin with the server ( If i had understand the concept and use SSE that time,won't it look beautiful ) .

The system compose multiple user role which is student/lecturer ( those who attend the system ), and student/lecturer (those who manage the attendance )
It similar to google form instead it have extra security to make sure people in the hall able to complete the authentication but at the same time manage to do it without cheating which is using Pulse Check.

Pulse Check is similar to captcha which only human can complete it. but instead image, I just use the dot pattern, which consist 5 empty dot and each dot might fill at some point . then the dot pattern such as 🔘⚫🔘⚫⚫ will translate as 01011. The user just need to click the dot pattern at the phone comparing to the projector. if it match then attendance succeed and vice versa.

This project is build with barebone php script and no single library is used for this project since I don't even know how to use the library that time being. It use Bootstrap 4 for the CSS and JQuery 3.6 for the ux and the ajax request.

I thought to upgrade this system to better functional system using laravel and implement SSE to support the pulse checker.But I'm just too lazy for that. Might be doing it might be don't.
