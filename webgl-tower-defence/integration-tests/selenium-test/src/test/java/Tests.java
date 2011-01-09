import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.server.RemoteControlConfiguration;
import org.openqa.selenium.server.SeleniumServer;

import com.thoughtworks.selenium.DefaultSelenium;
import com.thoughtworks.selenium.SeleneseTestCase;

public class Tests extends SeleneseTestCase {
	private static final int portNumber = 12345;
	private SeleniumServer seleniumServer;

	@Before
	public void setUp() throws Exception {
		RemoteControlConfiguration configuration = new RemoteControlConfiguration();
		configuration.setPort(portNumber);
		seleniumServer = new SeleniumServer(configuration);
		seleniumServer.start();
		
		selenium = new DefaultSelenium("localhost", portNumber, "*googlechrome", "http://localhost:8888/");
		selenium.start();
	}

	@Test
	public void testT() throws Exception {
		selenium.open("/");
		verifyTrue(selenium.isTextPresent("Niestety Twoja przeglądarka nie obsługuje WebGL. Przeglądarki"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
		
		seleniumServer.stop();
	}
}
