class DetectOs {
  static MAC = 'MAC';
  static WINDOWS = 'WINDOWS';
  static IOS = 'IOS';
  static ANDROID = 'ANDROID';
  static LINUX = 'LINUX';
  static WINDOWS_PHONE = 'WINDOWS_PHONE';

  getOSName(): string {
    if (typeof window === 'undefined') {
      return '';
    }

    const userAgent = navigator.userAgent || navigator.vendor;

    if (/macintosh|macintel|macppc|mac68k|macos|mac/i.test(userAgent)) {
      return DetectOs.MAC;
    } else if (/windows phone/i.test(userAgent)) {
      return DetectOs.WINDOWS_PHONE;
    } else if (/Win32|Win64|Windows|WinCE/i.test(userAgent)) {
      return DetectOs.WINDOWS;
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      return DetectOs.IOS;
    } else if (/android/i.test(userAgent)) {
      return DetectOs.ANDROID;
    } else if (/Linux/i.test(userAgent)) {
      return DetectOs.LINUX;
    }

    return '';
  }
}

export default new DetectOs();
