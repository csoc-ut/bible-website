import '../library/styles/defaults.css';
import { createElement } from '../library/components/elements';
import ArrowBack from '../library/assets/arrow_back_white.svg'
import bibleJSON from '../library/json/rcv.json';

export default class ReadingPlanPage
{
	constructor(parent, reading, bible)
	{
		this.parent = parent;
		this.reading = reading;
		this.bible = bible;
		this.build();
	}
	
	/* Builds our entire page */
	build()
	{
		// Navbar
		this.navWrapper = createElement('div', 'default-nav__wrapper', this.parent);
		this.createNavControl();
		
		// Page content
		this.wrapper = createElement('div', 'default-page__wrapper reading-plan-page__wrapper', this.parent);
		this.container = createElement('div', 'default-page__container', this.wrapper);
		this.createBibleText();
		this.createCopyRight();
	}
	
	/* Creates our navigation */
	createNavControl()
	{
		let backButton = createElement('div', 'default-nav__button__back', this.navWrapper); // Plan button
		createElement('img', 'default-nav__button__back__img', backButton, null, { src: ArrowBack });
		backButton.onclick = () => this.destroyPage();
		
		let bibleButton = createElement('div', 'default-nav__button__title', this.navWrapper); // Bible button
		createElement('div', 'default-nav__button__title__text', bibleButton, `Today's Reading`); // Bible button
		bibleButton.onclick = () => this.destroyPage();
	}
	
	/* Creates our bible text */
	createBibleText()
	{
		let bibleTextWrapper = createElement('div', 'default__bible-text', this.container);
		
		if (!this.bible)
			this.bible = bibleJSON;
		let readingSplit = this.reading.split(';');
		
		// NT
		createElement('div', 'default__bible-text__title', bibleTextWrapper, readingSplit[0].trim()); // Title	
		const ntReadingText = createElement('div', 'bible-text', bibleTextWrapper);; // NT reading text div
		
		let ntReading = readingSplit[0].trim().split(' ');
		if (ntReading[0] == '1' || ntReading[0] == '2' || ntReading[0] == '3') // Changes the title: ['2', 'John', '4'] => ['2 John', '4']
		{
			ntReading[0] += ` ${ntReading[1]}`;
			ntReading.splice(1, 1);
		}
		const ntReadingBook = this.bible.find(bookTitle => bookTitle.title == ntReading[0].trim()) // Find our nt book
		
		// Find our NT verses
		let chapter = null;
		let chapterNumber = null;
		let startVerse = 0;
		let endVerse = 0;
		if (ntReading[1].trim().search(':') == -1) // The whole chapter is in the reading
		{
			chapterNumber = ntReading[1]; // Find our chapter number
			chapter = ntReadingBook.pages[chapterNumber - 1];
			endVerse = chapter.text.length;
		}
		else // Only part of the chapter is used
		{
			let ntReadingSplit = ntReading[1].trim().split(':'); // Split the reading chapter/verses reference into an array
			
			chapterNumber = ntReadingSplit[0].trim(); // Get our chapter number
			chapter = ntReadingBook.pages[chapterNumber - 1];
			
			let versesSplit = ntReadingSplit[1].trim().split('-'); // Get our start and end verses
			startVerse = versesSplit[0].trim() - 1;
			endVerse = versesSplit[1].trim();
		}
		
		for (let j = startVerse; j < endVerse; ++j) // Print out the whole chapter
		{
			let verse = chapter.text[j];
			let verseWrapper = createElement('div', 'default__verse', ntReadingText)
			createElement('div', 'default__verse__number', verseWrapper, `${j+1} `);
			let verseText = createElement('div', 'default__verse__text', verseWrapper);
			verseText.innerHTML = verse;
			
		}
		
		// OT
		createElement('div', 'default__bible-text__title', bibleTextWrapper, readingSplit[1].trim()); // Title	
		const otReadingText = createElement('div', 'bible-text', bibleTextWrapper);; // NT reading text div
		
		let otReading = readingSplit[1].trim().split(' ');
		if (otReading[0] == '1' || otReading[0] == '2' || otReading[0] == '3') // Changes the title: ['2', 'John', '4'] => ['2 John', '4']
		{
			otReading[0] += ` ${otReading[1]}`;
			otReading.splice(1, 1);
		}
		if (otReading[0] == 'Song')
		{
			otReading[0] = `Song of Songs`;
			otReading.splice(1, 1);
		}
		const otReadingBook = this.bible.find(bookTitle => bookTitle.title == otReading[0].trim()) // Find our nt book
		
		// Find our OT verses
		chapter = null;
		chapterNumber = null;
		startVerse = 0;
		endVerse = 0;
		if (otReading[1].trim().search(':') == -1) // The whole chapter is in the reading
		{
			chapterNumber = otReading[1]; // Find our chapter number
			chapter = otReadingBook.pages[chapterNumber - 1];
			endVerse = chapter.text.length;
		}
		else // Only part of the chapter is used
		{
			let otReadingSplit = otReading[1].trim().split(':'); // Split the reading chapter/verses reference into an array
			
			chapterNumber = otReadingSplit[0].trim(); // Get our chapter number
			chapter = otReadingBook.pages[chapterNumber - 1];
			
			let versesSplit = otReadingSplit[1].trim().split('-'); // Get our start and end verses
			startVerse = versesSplit[0].trim() - 1;
			endVerse = versesSplit[1].trim();
		}
		
		for (let j = startVerse; j < endVerse; ++j) // Print out the whole chapter
		{
			let verse = chapter.text[j];
			let verseWrapper = createElement('div', 'default__verse', otReadingText)
			createElement('div', 'default__verse__number', verseWrapper, `${j+1} `);
			let verseText = createElement('div', 'default__verse__text', verseWrapper);
			verseText.innerHTML = verse;
		}
	}
	
	/* Add our copy right */
	createCopyRight()
	{
		createElement('div', 'default__copyright', this.container, 'Verses accessed from the Holy Bible Recovery Version (text-only edition) © 2020 Living Stream Ministry www.lsm.org')
	}
	
	/* Destroys the whole page */
	destroyPage()
	{
		// Remove the nav
		while (this.navWrapper.firstChild)
			this.navWrapper.removeChild(this.navWrapper.firstChild);
		this.navWrapper.remove();
		
		// Remove the page content
		while (this.wrapper.firstChild)
			this.wrapper.removeChild(this.wrapper.firstChild);
		this.wrapper.remove();
	}
	
}
