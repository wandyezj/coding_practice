/**
 * InterfaceTest Documentation
 * @param InterfaceTestParameter InterfaceTestParameterText
 * @InterfaceTestTag InterfaceTestTagValue
 */
declare interface InterfaceTest {

    /**
     * MethodTest1 Documentation
     * @param MethodTest1Parameter MethodTest1ParameterText
     * @MethodTest1Tag MethodTest1TagValue
     */
    MethodTest1(
        /**
         * MethodTest1Parameter1 Documentation
         * @param MethodTest1Parameter1Parameter MethodTest1Parameter1ParameterText
         * @MethodTest1Parameter1Tag MethodTest1Parameter1TagValue 
         */
        MethodTest1Parameter1: number, 
        MethodTest1Parameter2: boolean
    ): void;

    /**
     * MethodTest2 Documentation
     * @param MethodTest2Parameter MethodTest2ParameterText
     * @MethodTest2Tag MethodTest2TagValue
     */
    MethodTest2(): boolean[];

    /**
     * Property1Test Documentation
     * @param Property1TestParameter Property1TestParameterText
     * @Property1TestTag Property1TestTagValue
     */
    Property1Test: number;

    /**
     * Property2Test Documentation
     * @param Property2TestParameter Property2TestParameterText
     * @Property2TestTag Property2TestTagValue
     */
    Property2Test: number;
}