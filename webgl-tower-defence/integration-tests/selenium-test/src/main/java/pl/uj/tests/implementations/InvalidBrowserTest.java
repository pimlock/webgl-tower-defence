package pl.uj.tests.implementations;

import pl.uj.tests.core.AbstractTest;

public class InvalidBrowserTest extends AbstractTest {

	@Override
	public void run() {
		selenium.open("/");
		verifyTrue(selenium.isTextPresent("Niestety Twoja przeglądarka nie obsługuje WebGL. Przeglądarki"));
	}
}
