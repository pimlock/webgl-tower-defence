package pl.uj.tests.core;

import java.util.ArrayList;

import org.openqa.selenium.server.RemoteControlConfiguration;
import org.openqa.selenium.server.SeleniumServer;

import com.thoughtworks.selenium.DefaultSelenium;
import com.thoughtworks.selenium.SeleneseTestCase;
import com.thoughtworks.selenium.Selenium;

public class TestRunner {

	private ArrayList<Test> tests = new ArrayList<Test>();
	
	private SeleniumWrapper seleniumWrapper = new SeleniumWrapper();
	
	public void runAllTests() throws Exception {
		 seleniumWrapper.setUp();
		 
		 for (Test test : tests) {
			test.run();
		 }
		 
		 seleniumWrapper.tearDown();
	}
	
	public void registerTest(Test test) {
		if (!tests.contains(tests)) {
			test.setSelenium(seleniumWrapper.getSelenium());
		
			tests.add(test);
		}
	}

	/*
	private static Class[] getClasses(String packageName)
			throws ClassNotFoundException, IOException {
		ClassLoader classLoader = Thread.currentThread()
				.getContextClassLoader();
		assert classLoader != null;
		String path = packageName.replace('.', '/');
		Enumeration<URL> resources = classLoader.getResources(path);
		List<File> dirs = new ArrayList<File>();
		while (resources.hasMoreElements()) {
			URL resource = resources.nextElement();
			dirs.add(new File(resource.getFile()));
		}
		ArrayList<Class> classes = new ArrayList<Class>();
		for (File directory : dirs) {
			classes.addAll(findClasses(directory, packageName));
		}
		return classes.toArray(new Class[classes.size()]);
	}
	
	private static List<Class> findClasses(File directory, String packageName) throws ClassNotFoundException {
        List<Class> classes = new ArrayList<Class>();
        if (!directory.exists()) {
            return classes;
        }
        File[] files = directory.listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                assert !file.getName().contains(".");
                classes.addAll(findClasses(file, packageName + "." + file.getName()));
            } else if (file.getName().endsWith(".class")) {
                classes.add(Class.forName(packageName + '.' + file.getName().substring(0, file.getName().length() - 6)));
            }
        }
        return classes;
    }*/

	private class SeleniumWrapper extends SeleneseTestCase {
		private static final int portNumber = 12345;
		private SeleniumServer seleniumServer;

		public void setUp() throws Exception {
			RemoteControlConfiguration configuration = new RemoteControlConfiguration();
			configuration.setPort(portNumber);
			seleniumServer = new SeleniumServer(configuration);
			seleniumServer.start();

			selenium = new DefaultSelenium("localhost", portNumber,
					"*googlechrome", "http://localhost:8888/");
			selenium.start();
		}

		public void tearDown() throws Exception {
			selenium.stop();

			seleniumServer.stop();
		}
		
		public Selenium getSelenium () {
			return selenium;
		}
	}
}
