@echo off

set PeerCastStationPort=7146
set PeerCastPort=7144

echo %1 %2 %3 %4 %5

if {%4} == {"FLV"} (
	call %5 %1:%PeerCastPort%=%PeerCastStationPort% "%2" "%3"
) else (
	call %5 "%1" "%2" "%3"
)
