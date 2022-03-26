import './homePage.css';
import '../library/styles/defaults.css';
import ArrowForward from '../library/assets/arrow_forward_black.svg'
import { createElement } from '../library/components/elements';
import { getFullBookName } from '../library/components/bookNames';
import bibleJSON from '../library/json/rcv.json';
import readingPlanJSON from '../library/json/reading_plan.json'
import ReadingPlanPage from './readingPlanPage';
import BiblePage from './biblePage';

export default class HomePage
{
	constructor(parent)
	{
		this.parent = parent;
		this.build();
	}
	
	/* Builds our entire page */
	build()
	{
		// Navbar
		this.navWrapper = createElement('div', 'default-nav__wrapper', this.parent);
		this.createNavControl();
		
		// Page content
		this.wrapper = createElement('div', 'default-page__wrapper home-page__wrapper', this.parent);
		this.container = createElement('div', 'default-page__container', this.wrapper);
		this.createPlanPanel(); // Reading plan panel
	}
	
	/* Creates our navigation buttons */
	createNavControl()
	{
		let planButton = createElement('div', 'nav-button', this.navWrapper, 'Reading Plan'); // Plan button
		let bibleButton = createElement('div', 'nav-button', this.navWrapper, 'Bible'); // Bible button
		
		planButton.setAttribute('active', true);
		planButton.onclick = () =>
		{
			if (planButton.getAttribute('active') != 'true')
			{
				bibleButton.setAttribute('active', false);
				planButton.setAttribute('active', true);
				this.createPlanPanel();
			}
		};
		bibleButton.onclick = () =>
		{
			if (bibleButton.getAttribute('active') != 'true')
			{
				planButton.setAttribute('active', false);
				bibleButton.setAttribute('active', true);
				this.createBiblePanel();
			}
		}
	}
	
	/* Creates our reading plan picker */
	createPlanPanel()
	{
		this.clearPanel(); // Clear any existing panels
		let readingPlan = this.getReadingPlan();
		let date = new Date();
		const shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
		for (let i = 0; i < readingPlan.length; ++i)
		{
			// Find the correct date
			if (i !== 0)
				date.setDate(date.getDate() - 1);
			let monthNumber = date.getMonth();
			let month = shortMonthNames[monthNumber];
			let day = date.getDate();
			if (day < 10)
				day = "0" + day;
			let dayOfWeek = weekDays[date.getDay()];
			
			let todayReading = readingPlan[i]; // Convenience ref for the correct reading
			let row = createElement('div', 'home-page__grid-row', this.container); // Create the row
			
			// Date card
			let dateCard = createElement('div', 'home-page__grid-card__date', row);
			createElement('div', 'home-page__grid-card__date__month', dateCard, month);
			createElement('div', 'home-page__grid-card__date__number', dateCard, day);
			
			// Text
			let readingPlanWrapper = createElement('div', 'home-page__grid-card__text', row);
			let readingPlanText = createElement('div', 'home-page__grid-card__text__text', readingPlanWrapper);
			createElement('div', 'home-page__grid-card__text__day', readingPlanText, dayOfWeek);
			createElement('div', 'home-page__grid-card__text__reading', readingPlanText, todayReading);
			createElement('img', 'home-page__grid-card__img', readingPlanWrapper, null, { src: ArrowForward })
			
			// Handle clicks
			row.onclick = () => new ReadingPlanPage(this.parent, todayReading, this.bible);
		}
	}
	
	/* Gets the reading plan from the json and parses it */
	getReadingPlan()
	{
		/* Set Reading Plan from local JSON file and current Date */
		/* JSON: "date": "2020-08-26T05:00:00.000Z" */
		let date = new Date();
		if (!this.plan)
			this.plan = readingPlanJSON;
		
		let readingPlan = [];
		for (let i = 0; i < this.plan.length; ++i)
		{
			let readingPlanArraySplit = (this.plan[i].date).split("/"); // Get the date and split into ["MONTH", "DAY", "YEAR"]
			let year = date.getFullYear().toString();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			
			// Match Today's Date to our parsed date
			if (readingPlanArraySplit[0] === month.toString() &&
				readingPlanArraySplit[1] === day.toString() &&
				readingPlanArraySplit[2] === year.toString())
			{
				for (let j = 0; j < 15; ++j)
				{
					// Split the reading
					let readingSplit = this.plan[i - j].reading.split(";");
					
					// NT Title
					let ntSplit = readingSplit[0].split(" ");
					if (ntSplit[0] === "1" || ntSplit[0] === "2" || ntSplit[0] === "2")
					{
						ntSplit[0] += " " + ntSplit[1];
						ntSplit[1] = ntSplit[2];
						ntSplit.splice(-1, 1)
					}
					let nt_book_title = getFullBookName(ntSplit[0]);
					ntSplit[0] = nt_book_title;
					
					// OT Title 
					var otSplit = readingSplit[1].split(" ");
					otSplit.shift();
					if (otSplit[0] === "1" || otSplit[0] === "2")
					{
						otSplit[0] += " " + otSplit[1];
						otSplit[1] = otSplit[2];
						otSplit.splice(-1, 1)
					}
					let ot_book_title = getFullBookName(otSplit[0]);
					otSplit[0] = ot_book_title;
					
					/* Add to Screen and sessionStorage */
					let full_title = ntSplit.join(" ") + "; " + otSplit.join(" ");
					readingPlan.push(full_title);
				}
			}
		}
		return readingPlan;
	}
	
	/* Creates our Bible picker */
	createBiblePanel()
	{
		this.clearPanel(); // Clear any existing panels
		if (!this.bible)
			this.bible = bibleJSON;
		
		// Old testament
		createElement('div', 'home-page__grid-title', this.container, 'Old Testament');
		for (let i = 0; i < 39; ++i)
		{
			let row = createElement('div', 'home-page__grid-row', this.container);
			
			// Text
			let bibleBook = createElement('div', 'home-page__grid-card__bible-book', row);
			createElement('div', 'home-page__grid-card__bible-book__text', bibleBook, `${this.bible[i].title}`, { id: `book-${i}` });
			row.arrow = createElement('img', 'home-page__grid-card__bible-book__img', bibleBook, null, { src: ArrowForward, active: false })
			
			row.chapterExpand = createElement('div', 'home-page__grid-row__expand', this.container); // Chapter card
			row.chapterExpand.setAttribute('hidden', true);
			row.onclick = () => this.expandBibleRow(row, this.bible[i])
		}
		
		// New testament
		createElement('div', 'home-page__grid-title', this.container, 'New Testament');
		for (let i = 39; i < 66; ++i)
		{
			let row = createElement('div', 'home-page__grid-row', this.container);
			
			// Text
			let bibleBook = createElement('div', 'home-page__grid-card__bible-book', row);
			createElement('div', 'home-page__grid-card__bible-book__text', bibleBook, `${this.bible[i].title}`, { id: `book-${i}` });
			createElement('img', 'home-page__grid-card__bible-book__img', bibleBook, null, { src: ArrowForward })
			row.onclick = () => new BiblePage(this.parent, this.bible[i]);
		}
	}
	
	/* Expands the row for chapters */
	expandBibleRow(row, book)
	{
		let chapterExpand = row.chapterExpand; // Find our expandable section
		while (chapterExpand.firstChild) // Remove existing grids
			chapterExpand.removeChild(chapterExpand.firstChild);
		chapterExpand.setAttribute('hidden', !(chapterExpand.getAttribute('hidden') == 'true')); // Set our expand section to not hidden
		row.arrow.setAttribute('active', !(row.arrow.getAttribute('active') == 'true')); // Animate our row forward image to down
		
		// Create new chapter grid
		let chapterCardsWrapper = createElement('div', 'home-page__grid-row__expand__card__wrapper', chapterExpand);
		for (let i = 0; i < book.pages.length; ++i)
		{
			let card = createElement('div', 'home-page__grid-row__expand__card', chapterCardsWrapper, book.pages[i].id);
			card.onclick = () => new BiblePage(this.parent, book, i); //console.log(i);
		}
		
	}
	
	/* Clear any panels on the screen */
	clearPanel()
	{
		while (this.container.firstChild)
			this.container.removeChild(this.container.firstChild);
	}
	
}
