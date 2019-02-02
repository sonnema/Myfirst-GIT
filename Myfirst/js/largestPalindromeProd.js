document.getElementById('resultBox').style.display="none";
document.getElementById('timeBox').style.display="none";

function btnClick()
{
  var largestPalindrmProd = 0, inputValue = 0, lowestMultLmt = 0, highestMultLmt = 0,highestMultipleDivisBy11 = 0,minimumProdLmt = '';
  
  startTimer();
  
  inputValue = document.getElementById('digit').value;
  
  //get lowest operand to find a palindrome product
  lowestMultLmt = lowestMultiplierLimit(inputValue);
  
  //get highest operand to find a palindrome product
  highestMultLmt = highestMultiplierLimit(inputValue);
  
  //get highest N digit number divisible by 11
  highestMultipleDivisBy11 = highestMultipleDivisibleBy11(highestMultLmt);  
  
  //get minimum palindrome product limit
  minimumProdLmt = minProductValue(inputValue);
  
  //find largest palindrome product 
  if(inputValue > 1 && inputValue <= 7)
  {
	largestPalindrmProd = lrgstPlndrmPrdctLTE7Dgts(lowestMultLmt,highestMultLmt,minimumProdLmt,highestMultipleDivisBy11);
  }
  else if (inputValue === '8')
  {
  	largestPalindrmProd = lrgstPalndrmPrdctGT7Dgts(lowestMultLmt,highestMultLmt,minimumProdLmt,highestMultipleDivisBy11);
  }  
  
  document.getElementById('inputNumber').innerHTML = inputValue;
  
  if(inputValue === '' || inputValue === '0' || inputValue === '1' || inputValue >= 9)
  {
	  document.getElementById('resultBox').style.display="none";
	  document.getElementById('timeBox').style.display="none";  
	  alert("Please enter a digit(2-8)!!");   
  }
  else
  {
	  document.getElementById('answer').innerHTML = largestPalindrmProd;
	  document.getElementById('resultBox').style.display="block";
	  endTimer();   
	  document.getElementById('totalTime').innerHTML = timeDiff + " milliseconds" ;
	  document.getElementById('timeBox').style.display="block";
  }  
}

var timeDiff = 0, startTime = 0, startTimeMS = 0;

/* Below function is used to find out the time difference in milliseconds once the largest palindromic product is found. */
function startTimer() 
{
  startTime = new Date();
  startTimeMS = startTime.getMilliseconds();
}

/* Below function is used to find out the time difference in milliseconds once the largest palindromic product is found. */
function endTimer() 
{
  endTime = new Date();
  var endTimeMS = endTime.getMilliseconds();
  timeDiff = endTimeMS - startTimeMS; //in ms
}

/* Below function is used to find out the lowest N digit number. This will be the lowest Operand Limit for any N digit multiplication. For example, for 2 the lowest Operand Limit is 90, for 3 it should be 900. */
function lowestMultiplierLimit(inputDigit)
{
  var lowestOperand = '';
  if(inputDigit%2!==0)
  {  
    for(var i=0;i<(Math.round(inputDigit-1)/2);i++)
    {
    	lowestOperand += '9';
    }
    for(var j=0;j<(Math.round(inputDigit/2));j++)
    {
    	lowestOperand += '0'; 
    }
  }
  else
  {
    for(var k=0;k<(Math.round(inputDigit - 1)/2);k++)
    {
      lowestOperand += '9';
    }
    for(var l=0;l<(Math.round(inputDigit - 1)/2);l++)  
    {
      lowestOperand += '0';
    }
  }
  return lowestOperand;
}

/* Below function is used to find out the highest N digit number. This will be the highest Operand Limit for any N digit multiplication. For example, for 2 the highest Operand Limit is 99, for 3 it should be 999. */
function highestMultiplierLimit(inputDigit)
{
  var highestOperand = '9';
  for(var i=1;i<inputDigit;i++)
    {
      highestOperand += '9'; 
    }
  return highestOperand;
}

/* Below function is used to find out the largest N digit number divisible by 11. For example, 2 digits highest number divisible by 11 is 99, for 3 it's 990. */
function highestMultipleDivisibleBy11(highestMultLimit)
{
  var highestMultDivBy11 = 0;
  do{
    if(highestMultLimit%11 == 0)
      {
        highestMultDivBy11 = highestMultLimit; 
        break;
      }
    else
      {
        highestMultLimit -= 1; 
      }
  }while(highestMultDivBy11 == 0) ;
  return highestMultDivBy11;
}

/* Below function is used to check the lowest limit till where search for largest product should be done for any digit. For example, for 2 the minimum value of product should be 9000, for 3 it should be 900000. */
function minProductValue(inputDigit)
{
  var minimumProductValue = '';
  
  if(inputDigit%2!==0)
  {  
    for(var i=0;i<(Math.round(inputDigit - 1)/2);i++)
    {
    	minimumProductValue += '9';
    }
    for(var j=0;j<(Math.round(3*inputDigit/2));j++)
    {
    	minimumProductValue += '0'; 
    }
  }
  else
  {
    for(var k=0;k<(Math.round(inputDigit-1)/2);k++)
    {
    	minimumProductValue += '9';
    }
    for(var l=0;l<(Math.round(3*inputDigit - 1)/2);l++)  
    {
      minimumProductValue += '0';
    }
  }  
  return minimumProductValue;
}

/* This function is used to find out the largest palindrome product for 2 - 7 digits */
function lrgstPlndrmPrdctLTE7Dgts(lowestOperandLimit,highestOperandLimit,minProductLmt,highestOperandDivisibleBy11)
{
	var maxPalindromeProduct = minProductLmt;
	for(var i=highestOperandDivisibleBy11;(i>lowestOperandLimit);i-=11)
	{
		var iStr = i.toString();
		var iLastDigit = iStr.substr(iStr.length - 1,1);
		if((iLastDigit == '1') 
		|| (iLastDigit == '3') 
		|| (iLastDigit == '7') 
		|| (iLastDigit == '9')
		&&(i%10!=0))
		{
        for(var j = highestOperandLimit;(j > lowestOperandLimit);j = j - 1)
        {
          var prod = i*j;
          if(prod%11 == 0)
          {
        	  var jStr = j.toString();
        	  var jLastDigit = jStr.substr(jStr.length - 1,1);
        	  if((iLastDigit == '9' && jLastDigit == '1') 
            || (iLastDigit == '3' && jLastDigit == '3') 
            || (iLastDigit == '7' && jLastDigit == '7') 
            || (iLastDigit == '1' && jLastDigit == '9')) 
        	  { 
        		if(prod > maxPalindromeProduct)
        		{  
        		  var	product = prod.toString();
              if(chkPalindrome(product))
              {
              	maxPalindromeProduct = prod;
					      break;
              }
        		}//end of if(j%10!=0)
        	}//end of if(j.substr)
        }//end of if(i*j%11) check  
      }//end of for j loop
    }//end of if(i.substr)
	}//end of for i loop
	return maxPalindromeProduct;  
}

/* This function is used to find the largest palindrome for products having 8 digits or more */	
function lrgstPalndrmPrdctGT7Dgts(lowestOperandLimit,highestOperandLimit,minProductLmt,highestOperandDivisibleBy11)
{
	var maxPalindrmeProdHigherDigits = minProductLmt;
	for(var iOperand=highestOperandDivisibleBy11;iOperand>Math.sqrt(maxPalindrmeProdHigherDigits);iOperand-=11)  
	{
		if(compareProducts(multiplyLargeNumbers(iOperand.toString(),highestOperandLimit.toString()),maxPalindrmeProdHigherDigits)<=0 )
		{
			break;
		}    
		var iOperandLastDigit = iOperand.toString().substr(iOperand.toString().length - 1,1);
		if((iOperandLastDigit == '1') || (iOperandLastDigit == '3') || (iOperandLastDigit == '7') || (iOperandLastDigit == '9'))
		{ 
			if(iOperand%10!=0)
			{
				for(var jOperand = highestOperandLimit;jOperand > lowestOperandLimit  ;jOperand = jOperand - 1)
				{
					var jOperandStr = jOperand.toString();
					var jOperandLastDigit = jOperandStr.substr(jOperandStr.length - 1,1);
					if((iOperandLastDigit == '9' && jOperandLastDigit == '1') 
					|| (iOperandLastDigit == '3' && jOperandLastDigit == '3') 
					|| (iOperandLastDigit == '7' && jOperandLastDigit == '7') 
					|| (iOperandLastDigit == '1' && jOperandLastDigit == '9')
					&&(jOperand%10 != 0) 
					&& (iOperand%11 == 0 || jOperand%11 == 0)) 
					{
						var iMultj = multiplyLargeNumbers(iOperand.toString(),jOperandStr);
						if(compareProducts(iMultj,maxPalindrmeProdHigherDigits) > 0)
						{ 
							if(chkPalindrome(iMultj))      
							{
								maxPalindrmeProdHigherDigits = iMultj;
								//minProductLmt = maxPalindrmeProdHigherDigits; 
								break;
							}
							else
							{
								continue;
							} 
						}
						else
						{
							break;
						}
					}
				}
			}
		}
  }
	return maxPalindrmeProdHigherDigits;             
}

/* This function is used to find if the input string is a palindrome or not. */
function chkPalindrome(product)
{
  return(product.split('').reverse().join('') == product);
}

/*This function is used to compare the two input products by finding out the difference between the two.If the difference is positive, product1 is bigger*/
function compareProducts(product1,product2) 
{
	return(product1 - product2);
}

/* In javascript numbers beyond 15 digits are rounded if only handled as simple variables. One of the alternative is to convert them to arrays or strings for operations. Below function is used for multipying two eight digit numbers. */
function multiplyLargeNumbers(Number1,Number2)
{
	var result = [];
	if ((Number1 | 0) == 0 || (Number2 | 0) == 0) {
        return '0';
    }
    Number1 = Number1.split('').reverse();
    Number2 = Number2.split('').reverse();
    
    for (var i = 0; Number1[i] >= 0; i++) {
        for (var j = 0; Number2[j] >= 0; j++) {
            if (!result[i + j]) {
                result[i + j] = 0;
            }
           result[i + j] += Number1[i] * Number2[j];
        }
    }

    for (var i = 0; result[i] >= 0; i++) {
        if (result[i] >= 10) {
            if (!result[i + 1]) {
                result[i + 1] = 0;
            }

            result[i + 1] += parseInt(result[i] / 10);
            result[i] %= 10;
        }
    }

    return result.reverse().join('');
}
