package pl.uj.tests.core;

import pl.uj.tests.implementations.InvalidBrowserTest;

public class Execute {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		TestRunner testRunner = new TestRunner();
		testRunner.registerTest(new InvalidBrowserTest());
		
		try {
			testRunner.runAllTests();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
