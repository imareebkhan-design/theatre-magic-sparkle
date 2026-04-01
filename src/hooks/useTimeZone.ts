import { useMemo } from 'react';

interface TimeZoneInfo {
  tzName: string;
  tzAbbr: string;
  offsetHours: number; // offset from IST in hours
  isIST: boolean;
}

function getTimeZoneInfo(): TimeZoneInfo {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Get the abbreviation
  const abbr = new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop() || '';
  
  // IST offset is UTC+5:30 = 330 minutes
  const IST_OFFSET_MIN = 330;
  const localOffsetMin = -new Date().getTimezoneOffset(); // JS gives negative for east
  const diffMin = localOffsetMin - IST_OFFSET_MIN;
  
  return {
    tzName: tz,
    tzAbbr: abbr,
    offsetHours: diffMin / 60,
    isIST: Math.abs(diffMin) < 1, // within 1 minute = same timezone
  };
}

/**
 * Converts an IST time string (e.g. "8:30 AM") to the user's local timezone.
 * Returns both the converted time and timezone abbreviation.
 */
export function convertISTToLocal(istTimeStr: string): { localTime: string; tzAbbr: string; isIST: boolean } {
  const info = getTimeZoneInfo();
  
  if (info.isIST) {
    return { localTime: istTimeStr, tzAbbr: 'IST', isIST: true };
  }
  
  // Parse the IST time
  const match = istTimeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { localTime: istTimeStr, tzAbbr: info.tzAbbr, isIST: false };
  
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  
  // Convert to 24h
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  // Create a date object with IST time (use a known date)
  // IST is UTC+5:30
  const utcHours = hours - 5;
  const utcMinutes = minutes - 30;
  
  const date = new Date(Date.UTC(2026, 10, 29, utcHours, utcMinutes));
  
  const localTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return {
    localTime,
    tzAbbr: info.tzAbbr,
    isIST: false,
  };
}

/**
 * Hook that provides timezone-aware time display.
 * Shows local time with timezone label for NRI guests.
 */
export function useTimeZone() {
  const tzInfo = useMemo(() => getTimeZoneInfo(), []);
  
  const formatEventTime = (istTime: string, includeIST = true): string => {
    const { localTime, tzAbbr, isIST } = convertISTToLocal(istTime);
    
    if (isIST) {
      return includeIST ? `${localTime} IST` : localTime;
    }
    
    // Show both local time and IST for NRI guests
    return `${localTime} ${tzAbbr} (${istTime} IST)`;
  };
  
  return {
    ...tzInfo,
    formatEventTime,
  };
}
