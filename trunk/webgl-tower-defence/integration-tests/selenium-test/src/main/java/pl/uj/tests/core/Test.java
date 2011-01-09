package pl.uj.tests.core;

import com.thoughtworks.selenium.Selenium;

public interface Test {
	public void run();
	public void setSelenium(Selenium selenium);
}
