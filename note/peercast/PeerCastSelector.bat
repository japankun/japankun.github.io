@echo off

setlocal ENABLEDELAYEDEXPANSION

set PeerCastIP=192.168.11.1
set PeerCastStation=%PeerCastIP%:7146
set PeerCast=%PeerCastIP%:7144
set ArgvUrl=%1
set StreamUrl=!ArgvUrl:%PeerCast%=%PeerCastStation%!

if {%4} == {"FLV"} (
	start "" %5 "%StreamUrl%" "%2" "%3"
) else (
	start "" %5 "%1" "%2" "%3"
)
