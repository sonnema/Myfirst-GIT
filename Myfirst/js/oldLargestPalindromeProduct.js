var timeDiff = 0, endTime = 0, startTime = 0;
document.getElementById('resultBox').style.display="none";
document.getElementById('timeBox').style.display="none";
function btnClick()
{
  var largestPalindrmProd = 0, inputValue = 0, lowestMultLmt = 0, highestMultLmt = 0,highestMultipleDivisBy11 = 0,minimumProdLmt = '';
	
  startTimer();
	
	inputValue = document.getElementById('digit').value;
	//get lowest operand to find palindrome product
	lowestMultLmt = lowestMultiplierLimit(inputValue);
	//get highest operand to find palindrome product
	highestMultLmt = highestMultiplierLimit(inputValue);
	//get minimum palindrome product limit
highestMultipleDivisBy11 = highestMultipleDivisibleBy11(highestMultLmt);  
	//get minimum palindrome product limit
  minimumProdLmt = minProductValue(inputValue);
	//find largest palindrome product 
if(inputValue <= 7)
  {
  largestPalindrmProd = LargstPalindrmProdLTE7digits(lowestMultLmt,highestMultLmt,minimumProdLmt,highestMultipleDivisBy11);
  }
  else if (inputValue > 7)
  {
  largestPalindrmProd = LargstPalindrmProdGT7digits(lowestMultLmt,highestMultLmt,minimumProdLmt,highestMultipleDivisBy11);
  }  
	document.getElementById('inputNumber').innerHTML = inputValue;
	if(inputValue === '' || inputValue === '0')
	{
document.getElementById('resultBox').style.display="none";
		document.getElementById('timeBox').style.display="none";  

alert("Please enter a digit(2-9)!!");   
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
function startTimer() 
{
  startTime = new Date();
}

function endTimer() 
{
  endTime = new Date();
  timeDiff = endTime.getMilliseconds() - startTime.getMilliseconds(); //in ms
}
function lowestMultiplierLimit(inputDigit)
{
  var i;
  var lowestOperand = '';
  if(inputDigit%2!==0)
  {  
    for(i=0;i<(Math.round(inputDigit-1)/2);i++)
    {
    	lowestOperand += '9';
    }
    for(i=0;i<(Math.round(inputDigit/2));i++)
    {
    	lowestOperand += '0'; 
    }
  }
  else
  {
    for(i=0;i<(Math.round(inputDigit - 1)/2);i++)
    {
      lowestOperand += '9';
    }
    for(i=0;i<(Math.round(inputDigit - 1)/2);i++)  
    {
      lowestOperand += '0';
    }
  }
  return lowestOperand;
}
function highestMultiplierLimit(inputDigit)
{
  var i;
  var highestOperand = '9';
  for(i=1;i<inputDigit;i++)
    {
      highestOperand += '9'; 
    }
  return highestOperand;
}
function highestMultipleDivisibleBy11(highestMultLimit)
{
  var i;
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

function minProductValue(inputDigit)
{
  var i, minimumProductValue = '';
  
  if(inputDigit%2!==0)
  {  
    for(i=0;i<(Math.round(inputDigit - 1)/2);i++)
    {
    	minimumProductValue += '9';
    }
    for(i=0;i<(Math.round(3*inputDigit/2));i++)
    {
    	minimumProductValue += '0'; 
    }
  }
  else
  {
    for(i=0;i<(Math.round(inputDigit-1)/2);i++)
    {
    	minimumProductValue += '9';
    }
    for(i=0;i<(Math.round(3*inputDigit - 1)/2);i++)  
    {
      minimumProductValue += '0';
    }
  }  
  return minimumProductValue;
}
function LargstPalindrmProdLTE7digits(lowestOperandLimit,highestOperandLimit,minProductLmt,highestOperandDivisibleBy11)
{
	var prod = 0;	
	var boolVal = false;
  var i = highestOperandDivisibleBy11;
  var j = highestOperandLimit;
	var product = '';
	var lowerVal = 0;
	var iLastDigit = '', jLastDigit = '';
	var maxPalindromeProduct = minProductLmt;
	for(i=highestOperandDivisibleBy11;(i>lowestOperandLimit);i-=11)
	{
    iLastDigit = i.toString().substr(i.toString().length - 1,1);
		  if((iLastDigit == '1') || (iLastDigit == '3') || (iLastDigit == '7') || (iLastDigit == '9'))
		  { 
        if(i%10!=0)
        {
        for(j = highestOperandLimit; (j > lowestOperandLimit)  ;j = j - 1)
        {
          if((i*j)%11 == 0)
          {
            jLastDigit = j.toString().substr(j.toString().length - 1,1);
				    if((iLastDigit == '9' && jLastDigit == '1') || (iLastDigit == '3' && jLastDigit == '3') || (iLastDigit == '7' && jLastDigit == '7') || (iLastDigit == '1' && jLastDigit == '9')) 
            { 
					    if((i * j) > maxPalindromeProduct)
              {  
                  prod = i * j;
	  					    product = prod.toString();
                  boolVal = chkPalindrome(product);
		  			      if(boolVal == true)
								      {
									      maxPalindromeProduct = prod;
						            minProductLmt = maxPalindromeProduct; 
										    console.log("Maximum palindrome product : " + maxPalindromeProduct + " i : " + i + " j : " + j);
										    break;
									    }
                  }//end of if(j%10!=0)
            }//end of if(j.substr)
          }//end of if(i*j%11) check  
        }//end of for j loop
      }//end of if(i%10!==0)
    }//end of if(i.substr)
 }//end of while loop
 return maxPalindromeProduct;  
}

function chkPalindrome(product)
{
  var str = product;
  return(str.split('').reverse().join('') == str);
}

var consoleCounter = 0, consoleCounter1 = 0;
	
function LargstPalindrmProdGT7digits(lowestOperandLimit,highestOperandLimit,minProductLmt,highestOperandDivisibleBy11)
{
	
  var iOperand = highestOperandDivisibleBy11;
  var jOperand = parseInt(highestOperandLimit);
  var iOperandLastDigit = '', jOperandLastDigit = '';
	var booleanVal = false;
  var iMultj = '';
  var maxPalindrmeProdHigherDigits = minProductLmt;
  //var productLTmaxCounter = 0;
	for(iOperand=highestOperandDivisibleBy11;iOperand>Math.sqrt(maxPalindrmeProdHigherDigits);iOperand-=11)  
  {
    if(compareProducts(multiplyLargeNumbers(iOperand.toString(),highestOperandLimit.toString()),maxPalindrmeProdHigherDigits)<=0 )
      {
        console.log(iOperand.toString() + " , " + highestOperandLimit.toString());
        break;
      }    
 
    iOperandLastDigit = iOperand.toString().substr(iOperand.toString().length - 1,1);
		  if((iOperandLastDigit == '1') || (iOperandLastDigit == '3') || (iOperandLastDigit == '7') || (iOperandLastDigit == '9'))
		  { 
        if(iOperand%10!=0)
        {
          for(jOperand = highestOperandLimit;jOperand > lowestOperandLimit  ;jOperand = jOperand - 1)
          {
		         
            jOperandLastDigit = jOperand.toString().substr(jOperand.toString().length - 1,1);
    
   if((iOperandLastDigit == '9' && jOperandLastDigit == '1') || (iOperandLastDigit == '3' && jOperandLastDigit == '3') || (iOperandLastDigit == '7' && jOperandLastDigit == '7') || (iOperandLastDigit == '1' && jOperandLastDigit == '9')) 
    {
     if((jOperand%10 != 0) && (iOperand%11 == 0 || jOperand%11 == 0))
      {
        
      iMultj = multiplyLargeNumbers(iOperand.toString(),jOperand.toString());
      if(compareProducts(iMultj,maxPalindrmeProdHigherDigits) > 0)
      { 
     
                      booleanVal = chkPalindrome(iMultj);
								      if(booleanVal == true)
								      {
									      maxPalindrmeProdHigherDigits = iMultj;
				                minProductLmt = maxPalindrmeProdHigherDigits; 
		                    console.log("Maximum palindrome product : " + maxPalindrmeProdHigherDigits + " value of i and j are " + iOperand + " " + jOperand);
	                      break;
									    }
                      else
                      {
                          //console.log("Product formed: " + iMultj + " is not a palindrome, value of i and j are " + iOperand + " " + jOperand);
                         continue;
                      } 
	 	              }
                else
                {
           /*     console.log("Product formed: " + iMultj + " is less than maxpalindromelimit, value of i and j are " + iOperand + " " + jOperand);
                  productLTmaxCounter ++;*/                 
                  break;
                 }
              }
            }

          }
        }
      }
    }
    return maxPalindrmeProdHigherDigits;             
}

function compareProducts(product1,product2) 
{
	return(product1 - product2);
}

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
