package com.hitta.SpringSecurityExample.exceptions;

public class AlreadyVerifiedException extends RuntimeException {
    public AlreadyVerifiedException(String message) {
        super(message);
    }
}
