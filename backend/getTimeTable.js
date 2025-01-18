import puppeteer from "puppeteer";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const semelSelector = "#schoolSelector";
const idSelector = "#usernameInput";
const passwordSelector = "#passwordInput";
const menuSelector = "#mshv-main-toolbar > button:nth-child(1) > span.mat-mdc-button-touch-target";
const timetableButton = "#mainMenu > ul > li:nth-child(33) > button > span.mdc-button__label > div > span";
const tableSelector = ".TTTable";
const classSelectElm = "select";
const changesTableSelector = ".DNNAlignright div div.placeholder div table";


const awaitAndClick = async (page, selector) => {
    try {
      await page.waitForSelector(selector, {visible: true});
      await page.click(selector);
    } catch (error) {
      console.error(`Error waiting for and clicking selector ${selector}:`, error);
    }
};
  
const awaitAndType = async (page, selector, text) => {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, text);
    } catch (error) {
      console.error(`Error waiting for and typing in selector ${selector}:`, error);
    }
};
const listOpenTabs = async (browser) => {
    const pages = await browser.pages();
    const tabs = [];
    pages.forEach((page) => {
        tabs.push(page.url());
    });
    return tabs;
};

const waitForNewTab = async (browser, existingTabsCount) => {
  while ((await browser.pages()).length <= existingTabsCount) {
      await new Promise(resolve => setTimeout(resolve, 100)); 
  }
  const pages = await browser.pages();
  const newPage = pages[pages.length - 1]; 
  await newPage.waitForLoadState?.('domcontentloaded'); 
};

const categorizeChanges = async(changes) =>{
  const result = {};

  changes.forEach(change => {
      // Split the string into its components
      const parts = change.split(",").map(part => part.trim());
      
      if (parts.length === 4) {
          const [date, hour, teacher, type] = parts;
          
          // Create the structure if it doesn't exist
          if (!result[date]) {
              result[date] = [];
          }

          // Push each change with its details
          result[date].push({
              hour: hour.split(" ")[1], // Extract the hour (second part after "שיעור")
              teacher: teacher,
              type: type
          });
      }
  });

  return result;
}

async function getTimetableAndChanges(credentials) { 
    const { SEMEL , ID, PASSWORD, CLASS} = credentials;

    // Part 1
    const browser1 = await puppeteer.launch({ headless: true }); 
    const page1 = await browser1.newPage();

    await page1.goto('https://web.mashov.info/students/login');  
    

    await awaitAndType(page1,semelSelector,SEMEL);
    await page1.keyboard.press('Enter');
    await page1.keyboard.press('Enter');
  

    
    await awaitAndType(page1,idSelector,ID)
    await awaitAndType(page1,passwordSelector,PASSWORD)
    
    await page1.keyboard.press('Enter');
    await awaitAndClick(page1,menuSelector);

    await new Promise(resolve => setTimeout(resolve, 1000));
    await page1.waitForSelector(timetableButton, { visible: true });
    await page1.click(timetableButton);
    
    await waitForNewTab(browser1, 2);
    const tabs = await listOpenTabs(browser1);
    const timetableUrl = tabs[2];
    browser1.close();






    // Part 2
    const browser2 = await puppeteer.launch({ headless: true});
    const page2 = await browser2.newPage()
    await page2.goto(timetableUrl);

    const links = await page2.evaluate(() => {
      const xpath = "//a"; 
      const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      const links = [];
      
      for (let i = 0; i < result.snapshotLength; i++) {
        links.push(result.snapshotItem(i).href); 
      }
      
      return links;
    });

    const goToTimeTableCommand = links.find(link => link.includes('$TimeTableView$btnTimeTable'));
    const changesCmd = links.find(link => link.includes("$TimeTableView$btnChanges'")); // add ' at the end to make get $btnChange and not $btnChangesTable
    await page2.evaluate((command) => {
      eval(command);
    },goToTimeTableCommand);
    
    await page2.waitForSelector(tableSelector,{visible: true});
    const classDict = await page2.evaluate(() => {
      const options = Array.from(document.querySelectorAll('select option'));
      const classDict = {};
      
      options.forEach(option => {
        classDict[option.textContent.replaceAll(" ","")] = option.value;  // Using textContent as key, and value as the value
      });
      
      return classDict;
    });
    const classValue = classDict[CLASS];
    
    await page2.select(classSelectElm, classValue);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const tableData = await page2.evaluate((selector) => {
      const table = document.querySelector(selector);
      const rows = Array.from(table.querySelectorAll('tr'));
      
      let daysArray = [[], [], [], [], [], [], []]; // Array for each day (d1 to d7)
      let timesPerHour = []; // To store times for each hour
      
      rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td, th'));
        
        // Get times for the first column
        if (cells.length > 0) {
          let time = cells[0].innerText.trim();
          
          if (time) {
            // Remove the index (first number) and replace \n with space, then replace space with a hyphen
            time = time.replace(/^\d+\n/, '') // Remove the first index
            .replace('\n', '-') // Replace middle \n with hyphen
            .replace(/\n/g, ''); // Remove any remaining newlines
            timesPerHour.push(time);
          }
        }
        
        // Extract the subjects for each day (d1 to d7)
        cells.slice(1).forEach((cell, index) => {
          const subject = cell.innerText.replace(/\n/g, ' ').trim(); // Replace newline with space
          if (subject) {
            daysArray[index].push(subject);
          }
        });
      });
      
      return JSON.stringify({ daysArray, timesPerHour });  // Return as JSON string
    }, tableSelector);
    await browser2.close();
    
    
    
    
    // Part 3
    let changesTable=[]
    const browser3 = await puppeteer.launch({headless: true});
    const page3 = await browser3.newPage();
    await page3.goto(timetableUrl);

    await page3.select(classSelectElm, classValue);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await page3.evaluate((cmd) => {
      eval(cmd);
    },changesCmd)
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (await page3.$(  changesTableSelector + " tr")){ // If no changes skip

        await page3.waitForSelector(changesTableSelector, {visible:true})
        changesTable = await page3.evaluate((selector) => {
          // Select all matching elements and return their text content
          return Array.from(document.querySelectorAll(selector), element => element.textContent.trim());
      }, changesTableSelector + " tr td.MsgCell");
    }
  browser3.close();
  return [tableData,changesTable]

  }

// Testing Example:
const loginInfo =  {
  "SEMEL": process.env.REACT_APP_EX_SEMEL,
  "ID": process.env.REACT_APP_EX_ID,
  "PASSWORD": process.env.REACT_APP_EX_PASSWORD,
  "CLASS": process.env.REACT_APP_EX_CLASS 
}
// console.log(await getTimetableAndChanges(loginInfo)); // Test output
// Export
export default getTimetableAndChanges;
