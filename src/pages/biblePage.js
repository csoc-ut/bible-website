import '../library/styles/defaults.css';
import { createElement } from '../library/components/elements';
import ArrowBack from '../library/assets/arrow_back_white.svg'

export default class BiblePage
{
	constructor(parent, book, chapter)
	{
		this.parent = parent;
		this.book = book;
		this.chapterIndex = chapter;
		this.build();
	}
	
	/* Builds our entire page */
	build()
	{
		// Navbar
		this.navWrapper = createElement('div', 'default-nav__wrapper', this.parent);
		this.createNavControl();
		
		// Page content
		this.wrapper = createElement('div', 'default-page__wrapper bible-page__wrapper', this.parent);
		this.container = createElement('div', 'default-page__container', this.wrapper);
		this.createBibleText();
		this.createCopyRight();
		this.scrollToChapter();
	}
	
	/* Creates our navigation */
	createNavControl()
	{
		let backButton = createElement('div', 'default-nav__button__back', this.navWrapper); // Plan button
		createElement('img', 'default-nav__button__back__img', backButton, null, { src: ArrowBack });
		backButton.onclick = () => this.destroyPage();
		
		let bibleButton = createElement('div', 'default-nav__button__title', this.navWrapper); // Bible button
		createElement('div', 'default-nav__button__title__text', bibleButton, `${this.book.title}`); // Bible button
		bibleButton.onclick = () => this.destroyPage();
	}
	
	/* Creates our bible text */
	createBibleText()
	{
		let bibleText = createElement('div', 'default__bible-text', this.container)
		for (let i = 0; i < this.book.pages.length; ++i)
		{
			let chapter = this.book.pages[i];
			createElement('div', 'default__bible-text__title', bibleText, `${this.book.title} ${chapter.id}`, { id: chapter.id }); // Chapter title
			for (let j = 0; j < chapter.text.length; ++j)
			{
				let verse = chapter.text[j];
				let verseWrapper = createElement('div', 'default__verse', bibleText)
				createElement('div', 'default__verse__number', verseWrapper, `${j+1} `);
				let verseText = createElement('div', 'default__verse__text', verseWrapper);
				verseText.innerHTML = verse;
			}
		}
	}
	
	/* Add our copy right */
	createCopyRight()
	{
		createElement('div', 'default__copyright', this.container, 'Verses accessed from the Holy Bible Recovery Version (text-only edition) © 2020 Living Stream Ministry www.lsm.org')
	}
	
	scrollToChapter()
	{
		document.getElementById(this.chapterIndex + 1).scrollIntoView();
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
