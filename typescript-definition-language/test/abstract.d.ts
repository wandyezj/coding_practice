/**
 * NamespaceAbstract Documentation
 * @TagAbstract TagAbstractValue
 */
export declare namespace NamespaceAbstract {

    /**
     * FunctionAbstract Documentation
     * @param ParameterAbstract 
     * @returns ReturnValueAbstract Documentation
     * @TagAbstract TagAbstractValue
     */
    function FunctionAbstract(ParameterAbstract: Object[]): boolean;

    /**
     * InterfaceAbstract Documentation
     */
    interface InterfaceAbstract {
        /**
         * MethodAbstract Documentation
         * @param ParameterAbstract ParameterAbstract Documentation
         * @TagAbstract TagAbstractValue
         */
        MethodAbstract(ParameterAbstract: undefined): InterfaceAbstract;

        /**
         * InterfaceAbstract PropertyAbstract Documentation
         * @TagAbstract TagAbstractValue
         */
        PropertyAbstract: string;
    }

    /**
     * ClassAbstract Documentation
     * @TagAbstract TagAbstractValue
     */
    class ClassAbstract {

        /**
         * MethodAbstract Documentation
         * @param ParameterAbstract ParameterAbstract Documentation
         * @TagAbstract TagAbstractValue
         */
        MethodAbstract(ParameterAbstract: any): Object[];

        /**
         * ClassAbstract PropertyAbstract Documentation
         */
        PropertyAbstract: null;
    }

    /**
     * EnumAbstract Documentation
     * @param EnumAbstractParameter EnumAbstractParameterText
     */
    enum EnumAbstract {
        /**
         * EnumValAbstract1 Documentation
         * @param EnumValAbstract1Parameter EnumValAbstract1ParameterText
         * @EnumValAbstract1Tag EnumValAbstract1TagVal
         */
        EnumValAbstract1,

        /**
         *
         * @param 
         * @EnumValAbstract
         */
        EnumValAbstract2 = 1,

        EnumValAbstract3 = 'string'
    }

    /**
     * UnionVariableAbstract Documentation
     */
    let UnionVariableAbstract: number | undefined;

    /**
     * FunctionOptionalAbstract Documentation
     * @param ParameterOptionalAbstract 
     * @returns ReturnValueAbstract Documentation
     * @TagAbstract TagAbstractValue
     */
    function FunctionOptionalAbstract(
        /**
         * ParameterOptionalAbstract Documentation
         */
        ParameterOptionalAbstract?: boolean
    ): ClassAbstract & undefined;

    interface TestInterface1 extends ClassAbstract {
    }
  
    interface TestInterface2 extends TestInterface1, ClassAbstract, Object {
    }

    class InheritAbstract extends ClassAbstract implements TestInterface1, TestInterface2 {
    }
}