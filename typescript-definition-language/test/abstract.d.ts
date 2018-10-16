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
    function FunctionAbstract(ParameterAbstract: number): number;

    /**
     * InterfaceAbstract Documentation
     */
    interface InterfaceAbstract {
        /**
         * InterfaceAbstract PropertyAbstract Documentation
         * @TagAbstract TagAbstractValue
         */
        PropertyAbstract: number;
    }

    /**
     * ClassAbstract Documentation
     * @TagAbstract TagAbstractValue
     */
    class ClassAbstract {

        /**
         * ClassAbstract MethodAbstract Documentation
         * @param ParameterAbstract ParameterAbstract Documentation
         * @TagAbstract TagAbstractValue
         */
        MethodAbstract(ParameterAbstract: number): InterfaceAbstract;

        /**
         * ClassAbstract PropertyAbstract Documentation
         */
        PropertyAbstract: number;
    }
}