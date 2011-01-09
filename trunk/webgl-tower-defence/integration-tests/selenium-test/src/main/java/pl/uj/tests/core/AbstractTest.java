package pl.uj.tests.core;

import com.thoughtworks.selenium.SeleneseTestBase;
import com.thoughtworks.selenium.Selenium;

public abstract class AbstractTest extends SeleneseTestBase implements Test {

	protected Selenium selenium;

	@Override
	public void setSelenium(Selenium selenium) {
		this.selenium = selenium;
	}
}
