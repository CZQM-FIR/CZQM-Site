<template>
  <div>
    <section>
      <h2>Sector Files: Instructions</h2>
      <p>
        The CZQM/CZQX sector file are for Euroscope v3.2 with the Canscope addon
        package. The Canscope packages covers both Moncton (CZQM) and Gander
        Domestic (CZQX) airspace.
      </p>
      <p>
        For more information on how to obtain this software, please visit the
        VATCAN web site.
      </p>

      <h3>Installation:</h3>
      <ol>
        <li>Download the file below and save it in a temporary directory;</li>
        <li>Extract the contents;</li>
        <li>
          C:\Users\Your Name\Documents\EuroScope\CANscope\CZQM-CZQX directory;
        </li>
        <li>
          Copy the .ese & .sct2 files to the C:\Users\Your
          Name\Documents\EuroScope\CANscope\CZQM-CZQX directory;
        </li>
      </ol>

      <h3>It is recommended that you create a CZQM desktop shortcut:</h3>
      <ol>
        <li>Right click on your desktop and Click New shortcut;</li>
        <li>
          Copy and Paste this line into your Shortcut: "C:\Program
          Files\EuroScope\EuroScope.exe"
          "C:\Users\YourName\Documents\Euroscope\CANscope\CZQM.PRF"
        </li>
        <li>
          The Quotes must be present. Change Your Name to how your system name
          is.
        </li>
      </ol>

      <h3>Once your Desktop Shortcut is setup:</h3>
      <ol>
        <li>Run your CZQM Euroscope Program;</li>
        <li>Click Open Sct;</li>
        <li>Click Load Sector File;</li>
        <li>Look for the file you saved (The .SCT2 file) and load that one;</li>
        <li>Close Euroscope, it will ask you a series of questions;</li>
        <li>
          If prompted to save the changes to the NEW.ASR file, click Cancel;
        </li>
        <li>If prompted to save any other changes, Click Save;</li>
        <li>
          Go to the C:\Users\Your Name\Documents\EuroScope\CANscope\CZQM-CZQX
          directory;
        </li>
        <li>Create a directory called Old_Sector_Files;</li>
        <li>
          Move the old CZQM-CZQX_*.sct2 and similar .ese files into the
          Old_Sector_Files directory;
        </li>
        <li>Click your CZQM IFR shortcut again;</li>
        <li>
          You will be prompted that Euroscope cannot find the old sector file,
          do you wish to use the new sector file instead. Click Yes;
        </li>
        <li>Close Euroscope and make sure you save your changes;</li>
        <li>Your Moncton/Gander FIR sector files are now up to date!</li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
