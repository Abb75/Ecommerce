#! /usr/bin/env python3.6

"""
server.py
Stripe Sample.
Python 3.6 or newer required.
"""
import os

import stripe
# This is a public sample test API key.
# Don’t submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import stripe

from decouple import config

stripe.api_key = config('STRIPE_API_KEY')

@api_view(['POST'])
def create_payment(request):
    get_amount = ''.join(request.data['amount'])

    amount = int(float(get_amount) * 100)
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='eur',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        print(intent)
        return Response({
            'clientSecret': intent['client_secret']
        })
    except:
        return Response({'error': 'error'})
